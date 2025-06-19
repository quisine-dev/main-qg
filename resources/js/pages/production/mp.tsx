import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import Tableau from "./components/tableau";
import Formulaire from "./components/formulaire";
import { Head, router } from "@inertiajs/react";
import { Toaster, toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Product", href: "/production/mp" },
];

export default function MP({ mps }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Initialisation du formulaire
  const methods = useForm({
    defaultValues: {
      nom: "",
      type: "",
      unite: "",
      prix_unitaire: "",
      composants: [], // pour les matières composites
      
    },
  });

  const { reset, handleSubmit } = methods;

  // 🔁 Met à jour les valeurs du formulaire si selectedProduct change
  useEffect(() => {
    if (selectedProduct) {
      reset({
        nom: selectedProduct.nom || "",
        type: selectedProduct.type || "",
        unite: selectedProduct.unite || "",
        prix_unitaire: selectedProduct.prix_unitaire || "",
        composants: selectedProduct.type === "composite"
        ? selectedProduct.ingredients?.map((ingredient) => ({
            mp_id: ingredient.id,
            qte: ingredient.pivot.quantite,
          })) || []
        : [],
      });
    } else {
      reset({
        nom: "",
        type: "",
        unite: "",
        prix_unitaire: "",
        composants: [],
      }); // vide tout si rien sélectionné
    }
  }, [selectedProduct, reset]);

  const onSubmit = (data) => {
    if (selectedProduct) {
      router.put(`/production/mp/${selectedProduct.id}`, data, {
        onSuccess: () => {
          toast.success("Matière Première mise à jour");
          setSelectedProduct(null);
        },
        onError: (errors) => {
          toast.error(errors.nom || "Erreur de mise à jour");
        },
      });
    } else {
      router.post("/production/mp", data, {
        onSuccess: () => {
          toast.success("Matière Première ajoutée");
          reset();
        },
        onError: (errors) => {
          toast.error(errors.nom || "Erreur de création");
        },
      });
    }
  };

  const handleDelete = (id) => {
    router.delete(`/production/mp/${id}`, {
      onSuccess: () => {
        toast.success("Matière Première supprimée");
        reset();
        setSelectedProduct(null);
      },
      onError: (errors) => {
        toast.error(errors.error || "Erreur de suppression");
      },
    });
  };

  const handleRowClick = (mp) => {
    setSelectedProduct(mp);
  };

  const cancelEdit = () => {
    setSelectedProduct(null);
  };

  const titres = ["Name", "Type","Unit"];
  const keys = ["nom","type", "unite"];
  const isEditing = selectedProduct !== null;

  const inputs = [
    { name: "nom", label: "Nom", placeholder: "Nom de la matière première" },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: [
        { value: "simple", label: "Simple" },
        { value: "composite", label: "Composite" }
      ]
    },
    {
      name: "unite",
      label: "Unité",
      type: "select",
      options: [
        { value: "kg", label: "Kilo-gramme" },
        { value: "L", label: "Litre" },
        { value: "g", label: "gramme" }

      ]
    },
    { name: "prix_unitaire", label: "Prix unitaire", type: "number", placeholder: "Prix unitaire en €" }
  ];

  const composantsOptions = [
    { id: 1, nom: "Farine" },
    { id: 2, nom: "Eau" },
    { id: 3, nom: "Levure" }
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Matière Première" />
      <Toaster richColors closeButton position="top-right" />
      <div className="py-6 px-5">
        <div className="flex gap-6">
          {/* Formulaire */}
          <div className="w-1/3 p-5 rounded-md border">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {isEditing ? "Modifier la Matière Première" : "Ajouter une Matière Première"}
            </h2>
            <FormProvider {...methods}>
              <Formulaire
                key={selectedProduct?.id || "new"}
                inputs={inputs}
                onSubmit={onSubmit}
                onCancel={cancelEdit}
                isEditing={isEditing}
                withComposants={true}
                composantsOptions={composantsOptions}
              />
            </FormProvider>
          </div>

          {/* Tableau */}
          <div className="w-2/3 p-5 rounded-md border">
            <Tableau
              titres={titres}
              keys={keys}
              elements={mps || []}
              titlePage="Matière Première List"
              handleDelete={handleDelete}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
