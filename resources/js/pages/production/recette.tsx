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
  { title: "Recettes", href: "/production/recette" },
];

export default function Recette({ recettes, produits, matieres }) {
  const [selectedRecette, setSelectedRecette] = useState(null);

  const methods = useForm({
    defaultValues: {
      produit_id: "",
      composants: [], // Liste des MP ou MPC avec leur quantité
    },
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (selectedRecette) {
      reset({
        produit_id: selectedRecette.produit_id || "",
        composants: selectedRecette.matieres?.map((c) => ({
          mp_id: c.id,
          qte: c.pivot.quantite,
        })) || [],
      });
    } else {
      reset({
        produit_id: "",
        composants: [],
      });
    }
  }, [selectedRecette, reset]);

  const onSubmit = (data) => {
    if (selectedRecette) {
      router.put(`/production/recette/${selectedRecette.id}`, data, {
        onSuccess: () => {
          toast.success("Recette mise à jour");
          setSelectedRecette(null);
        },
        onError: (errors) => {
          toast.error(errors.produit_id || "Erreur de mise à jour");
        },
      });
    } else {
      router.post("/production/recette", data, {
        onSuccess: () => {
          toast.success("Recette ajoutée");
          reset();
        },
        onError: (errors) => {
          toast.error(errors.produit_id || "Erreur de création");
        },
      });
    }
  };

  const handleDelete = (id) => {
    router.delete(`/production/recette/${id}`, {
      onSuccess: () => {
        toast.success("Recette supprimée");
        reset();
        setSelectedRecette(null);
      },
      onError: (errors) => {
        toast.error(errors.error || "Erreur de suppression");
      },
    });
  };

  const handleRowClick = (recette) => {
    setSelectedRecette(recette);
  };

  const cancelEdit = () => {
    setSelectedRecette(null);
  };

  const titres = ["Produit", "Date création"];
  const keys = ["produit.nom", "created_at"];

  const inputs = [
    {
      name: "produit_id",
      label: "Produit concerné",
      type: "select",
      options: produits.map((p) => ({
        value: p.id,
        label: p.nom,
      })),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Recettes" />
      <Toaster richColors closeButton position="top-right" />
      <div className="py-6 px-5">
        <div className="flex gap-6">
          {/* Formulaire */}
          <div className="w-1/3 p-5 rounded-md border">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {selectedRecette ? "Modifier la recette" : "Ajouter une recette"}
            </h2>
            <FormProvider {...methods}>
              <Formulaire
                key={selectedRecette?.id || "new"}
                inputs={inputs}
                onSubmit={onSubmit}
                onCancel={cancelEdit}
                isEditing={!!selectedRecette}
                withComposants={true}
                composantsOptions={matieres}
                showComposantsUnconditionally={true}
              />
            </FormProvider>
          </div>

          {/* Tableau */}
          <div className="w-2/3 p-5 rounded-md border">
            <Tableau
              titres={titres}
              keys={keys}
              elements={recettes || []}
              titlePage="Liste des recettes"
              handleDelete={handleDelete}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
