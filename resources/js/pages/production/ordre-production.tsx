import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import Tableau from "./components/tableau";
import Formulaire from "./components/formulaire";
import { Head, router } from "@inertiajs/react";
import { Toaster, toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Product", href: "/production/produit" },
];

export default function OrdreProduction({ mpcs,ordres }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Initialisation du formulaire
  const methods = useForm({
    defaultValues: {
      mp_id: 0,
      qte: 0,
      operateur: "",
      statut : "en_attente",
      date_production : "",
      remarques:""
    },
  });

  const { reset, handleSubmit } = methods;

  // 🔁 Met à jour les valeurs du formulaire si selectedProduct change
  useEffect(() => {
    if (selectedProduct) {
      reset({
        mp_id: selectedProduct.mp_id || "",
        qte: selectedProduct.qte,
        operateur: selectedProduct.operateur,
        statut : selectedProduct.statut,
        date_production: selectedProduct.date_production || "", // ✅ ici
        remarques: selectedProduct.remarques || "" // ← FIXED
    });
    } else {
      reset({
        mp_id: 0,
        qte: 0,
        operateur: "",
        statut : "en_attente",
        date_production : "",
        remarques:""
      }); // vide tout si rien sélectionné
    }
  }, [selectedProduct, reset]);

  const onSubmit = (data) => {
    if (selectedProduct) {
      router.put(`/production/ordre-production/${selectedProduct.id}`, data, {
        onSuccess: () => {
          toast.success("Ordre de Poduction mis à jour");
          setSelectedProduct(null);
        },
        onError: (errors) => {
          toast.error(errors.nom || "Erreur de mise à jour");
        },
      });
    } else {
      router.post("/production/ordre-production", data, {
        onSuccess: () => {
          toast.success("Ordre de Poduction  ajouté");
          reset();
        },
        onError: (errors) => {
          toast.error(errors.nom || "Erreur de création");
        },
      });
    }
  };

  const handleDelete = (id) => {
    router.delete(`/production/ordre-production/${id}`, {
      onSuccess: () => {
        toast.success("Ordre de Poduction  supprimé");
        reset();
        setSelectedProduct(null);
      },
      onError: (errors) => {
        toast.error(errors.error || "Erreur de suppression");
      },
    });
  };

  const handleRowClick = (ordre) => {
    setSelectedProduct(ordre);
  };

  const cancelEdit = () => {
    setSelectedProduct(null);
  };

  const titres = ["Matiere Premiere", "Quantité", "Opérateur","Statut", "Date", "Remarques" ];
  const keys = ["matierePremiere.nom", "qte", "operateur","statut","date_production","remarques"];
  const isEditing = selectedProduct !== null;

  const composantsOptions = mpcs
    .map(mp => ({
        value: mp.id,
        label: mp.nom
  }));

  const inputs = [
    {
      name: "mp_id",
      label: "Matière première",
      type: "select",
      options: composantsOptions, // 👈 à remplir dynamiquement via props avec la liste des MP composites
      placeholder: "Sélectionnez une matière première composite"
    },
    {
      name: "qte",
      label: "Quantité à produire",
      type: "number",
      placeholder: "Quantité à produire"
    },
    {
      name: "operateur",
      label: "Opérateur",
      type: "text",
      placeholder: "Nom de l’opérateur"
    },
    {
      name: "statut",
      label: "Statut",
      type: "select",
      options: [
        { value: "en_attente", label: "En attente" },
        { value: "en_cours", label: "En cours" },
        { value: "termine", label: "Terminé" },
        { value: "annule", label: "Annulé" }
      ]
    },
    {
      name: "date_production",
      label: "Date de production",
      type: "date"
    },
    {
      name: "remarques",
      label: "Remarques",
      type: "textarea",
      placeholder: "Notes ou informations supplémentaires (optionnel)"
    }
  ];
  

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ordre de Production" />
      <Toaster richColors closeButton position="top-right" />
      <div className="py-6 px-5">
        <div className="flex gap-6">
          {/* Formulaire */}
          <div className="w-1/3 p-5 rounded-md border">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {isEditing ? "Modifier l'ordre de production" : "Ajouter un ordre de production"}
            </h2>
            <FormProvider {...methods}>
              <Formulaire
                key={selectedProduct?.id || "new"} // 🧠 C’est CETTE ligne qui résout ton bug
                inputs={inputs}
                onSubmit={onSubmit}
                onCancel={cancelEdit}
                isEditing={isEditing}
              />
            </FormProvider>
          </div>

          {/* Tableau */}
          <div className="w-2/3 p-5 rounded-md border">
            <Tableau
              titres={titres}
              keys={keys}
              elements={ordres || []}
              titlePage="Product List"
              handleDelete={handleDelete}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}














