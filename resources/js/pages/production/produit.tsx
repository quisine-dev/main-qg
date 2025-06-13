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

export default function Produit({ produits }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Initialisation du formulaire
  const methods = useForm({
    defaultValues: {
      nom: "",
      desc: "",
      unite: "",
    },
  });

  const { reset, handleSubmit } = methods;

  // 🔁 Met à jour les valeurs du formulaire si selectedProduct change
  useEffect(() => {
    if (selectedProduct) {
      reset({
        nom: selectedProduct.nom || "",
        desc: selectedProduct.desc || "",
        unite: selectedProduct.unite || "",
      });
    } else {
      reset({
        nom: "",
        desc: "",
        unite: "",
      }); // vide tout si rien sélectionné
    }
  }, [selectedProduct, reset]);

  const onSubmit = (data) => {
    if (selectedProduct) {
      router.put(`/production/produit/${selectedProduct.id}`, data, {
        onSuccess: () => {
          toast.success("Produit mis à jour");
          setSelectedProduct(null);
        },
        onError: (errors) => {
          toast.error(errors.nom || "Erreur de mise à jour");
        },
      });
    } else {
      router.post("/production/produit", data, {
        onSuccess: () => {
          toast.success("Produit ajouté");
          reset();
        },
        onError: (errors) => {
          toast.error(errors.nom || "Erreur de création");
        },
      });
    }
  };

  const handleDelete = (id) => {
    router.delete(`/production/produit/${id}`, {
      onSuccess: () => {
        toast.success("Produit supprimé");
        reset();
        setSelectedProduct(null);
      },
      onError: (errors) => {
        toast.error(errors.error || "Erreur de suppression");
      },
    });
  };

  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

  const cancelEdit = () => {
    setSelectedProduct(null);
  };

  const titres = ["Name", "Unit"];
  const keys = ["nom", "unite"];
  const isEditing = selectedProduct !== null;

  const inputs = [
    { name: "nom", label: "Name", type: "text", placeholder: "Entrez le nom" },
    { name: "desc", label: "Description", type: "textarea", placeholder: "Entrez la description" },
    {
      name: "unite",
      label: "Unit",
      type: "select",
      options: [
        { value: "g", label: "Gramme" },
        { value: "kg", label: "Kilogramme" },
        { value: "l", label: "Litre" },
      ],
    },
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
              {isEditing ? "Modifier le produit" : "Ajouter un produit"}
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
              elements={produits || []}
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
