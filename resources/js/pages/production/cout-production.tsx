import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import Tableau from "./components/tableau";
import Formulaire from "./components/formulaire";
import { Head, router } from "@inertiajs/react";
import { Toaster, toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Production", href: "/production" },
  { title: "Coûts de Production", href: "/production/couts" }, // Chemin correct pour les coûts
];

export default function CoutProduction({ coutProduits, produits, tauxTva, margeParDefautPourcentage }) {
  const [selectedCout, setSelectedCout] = useState(null);

  const methods = useForm({
    defaultValues: {
      produit_id: "",
      charge_fixe: "",
      // Les pourcentages peuvent être initialisés avec les valeurs passées par le backend
      marge_pourcentage: margeParDefautPourcentage || 0.30,
      taux_tva: tauxTva || 0.20,
      // Les champs calculés ne sont pas dans defaultValues car ils sont dérivés
      // et seront remplis dynamiquement ou à la sélection pour édition.
    },
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (selectedCout) {
      reset({
        produit_id: selectedCout.produit_id || "",
        charge_fixe: selectedCout.charge_fixe || "",
        // Lors de l'édition, on remplit aussi les champs calculés pour les afficher
        // Cependant, ils ne sont plus dans le tableau 'inputs' affiché dans le formulaire
        // Ils seront toujours disponibles dans l'objet 'selectedCout' pour d'autres usages si besoin.
        charge_variable: selectedCout.charge_variable || "",
        cout_total: selectedCout.cout_total || "",
        marge: selectedCout.marge || "",
        prix_vente_ht: selectedCout.prix_vente_ht || "",
        tva: selectedCout.tva || "",
        prix_vente_ttc: selectedCout.prix_vente_ttc || "",
        // Réinitialiser les pourcentages à leurs valeurs par défaut ou aux valeurs de l'enregistrement si vous les stockez
        // Pour l'exemple, nous les gardons à leur valeur par défaut ou à celle passée par le backend si non stockés dans 'cout_produits'
        marge_pourcentage: margeParDefautPourcentage || 0.30,
        taux_tva: tauxTva || 0.20,
      });
    } else {
      reset({
        produit_id: "",
        charge_fixe: "",
        marge_pourcentage: margeParDefautPourcentage || 0.30,
        taux_tva: tauxTva || 0.20,
        // Les champs calculés ne sont plus réinitialisés ici, car ils ne sont plus dans le formulaire
      });
    }
  }, [selectedCout, reset, margeParDefautPourcentage, tauxTva]); // Ajouter les props dans les dépendances

  const onSubmit = (data) => {
    // Le payload doit inclure les pourcentages de marge et TVA car le backend en a besoin pour le calcul.
    const payload = {
        ...data,
        marge_pourcentage: parseFloat(data.marge_pourcentage), // Convertir en nombre
        taux_tva: parseFloat(data.taux_tva), // Convertir en nombre
    };

    if (selectedCout) {
      router.put(`/production/couts/${selectedCout.id}`, payload, {
        onSuccess: () => {
          toast.success("Coût de production mis à jour");
          setSelectedCout(null);
        },
        onError: (errors) => {
          toast.error(errors.produit_id || errors.charge_fixe || "Erreur de mise à jour");
        },
      });
    } else {
      router.post("/production/couts", payload, {
        onSuccess: () => {
          toast.success("Coût de production ajouté");
          reset();
        },
        onError: (errors) => {
          toast.error(errors.produit_id || errors.charge_fixe || "Erreur de création");
        },
      });
    }
  };

  const handleDelete = (id) => {
    router.delete(`/production/couts/${id}`, {
      onSuccess: () => {
        toast.success("Coût de production supprimé");
        reset();
        setSelectedCout(null);
      },
      onError: (errors) => {
        toast.error(errors.error || "Erreur de suppression");
      },
    });
  };

  const handleRowClick = (cout) => {
    setSelectedCout(cout);
  };

  const cancelEdit = () => {
    setSelectedCout(null);
  };

  // Titres et clés pour le tableau
  const titres = ["Produit", "Coût Total (€)", "Prix Vente HT (€)", "Prix Vente TTC (€)"];
  // Assurez-vous que le produit est chargé avec la relation pour accéder à produit.nom
  const keys = ["produit.nom", "cout_total", "prix_vente_ht", "prix_vente_ttc"];

  // Définition des champs du formulaire
  const inputs = [
    {
      name: "produit_id",
      label: "Produit concerné",
      type: "select",
      options: produits.map((p) => ({
        value: p.id,
        label: p.nom,
      })),
      placeholder: "Sélectionnez un produit"
    },
    { name: "charge_fixe", label: "Charges Fixes (€)", type: "number", placeholder: "Ex: 100", step: "0.01" },
    { name: "marge_pourcentage", label: "Marge (%)", type: "number", placeholder: "Ex: 0.30 (pour 30%)", step: "0.01" },
    { name: "taux_tva", label: "Taux TVA (%)", type: "number", placeholder: "Ex: 0.20 (pour 20%)", step: "0.01" },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Coûts de Production" />
      <Toaster richColors closeButton position="top-right" />
      <div className="py-6 px-5">
        <div className="">
          {/* Formulaire
          <div className="w-1/3 p-5 rounded-md border">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {selectedCout ? "Modifier un Coût de Production" : "Calculer un Coût de Production"}
            </h2>
            <FormProvider {...methods}>
              <Formulaire
                key={selectedCout?.id || "new"}
                inputs={inputs}
                onSubmit={onSubmit}
                onCancel={cancelEdit}
                isEditing={!!selectedCout}
              />
            </FormProvider>
          </div> */}

          {/* Tableau */}
          <div className="p-5 rounded-md border">
            <Tableau
              titres={titres}
              keys={keys}
              elements={coutProduits || []}
              titlePage="Liste des Coûts de Production"
              handleDelete={handleDelete}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
