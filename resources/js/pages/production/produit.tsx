import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import Tableau from "./components/tableau";
import Formulaire from "./components/formulaire";
import { Head, router } from "@inertiajs/react";
import { Toaster,toast } from "sonner"
import { useForm, FormProvider } from 'react-hook-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: '/production/produit'
    }
];

export default function Produit({produits}) {

    const methods = useForm(); // déclaration ici
    const { reset, handleSubmit } = methods;

    const onSubmit = (data)=>{
        router.post('/production/produit', data, {
            onSuccess: () => {
                toast.success('Product created successfully');
                reset();
            },
            onError: (errors) => {
                toast.error(errors.name || 'Failed to create Product');
            },
        });
        
    }

    const handleDelete = (id: number) => {
       
            router.delete(`/production/produit/${id}`, {
                onSuccess: () => {
                    toast.success('Produit deleted successfully');
                    reset(); // <-- Vide les champs après succès
                },
                onError: (errors) => {
                    toast.error(errors.error || 'Failed to delete Produit');
                },
            });
        
    };


    // Les variables
    const titres = ["Name", "Unit"];
    

    const inputs = [
        { name: "nom", label: "Name", type: "text", placeholder: "Entrez le nom" },
        { name: "desc", label: "Description", type: "textarea", placeholder: "Entrez la description"},
        {
          name: "unite",
          label: "Unit",
          type: "select",
          options: [
            { value: "g", label: "Gramme" },
            { value: "kg", label: "KiloGramme" },
            { value: "l", label: "Litre" },
          ]
        },
      ];


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ordre de Production" />
            <Toaster richColors closeButton position="top-right" />
            {/* Main div */}
            <div className="py-6 px-5">
                <div className="flex gap-6"> {/* Added flex and gap for spacing */}
                    {/* Formulaire */}
                    <div className="w-1/3 p-5 rounded-md border"> {/* Added w-1/3 for left column width and styling */}
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Product</h2>
                        <div>
                            <Formulaire inputs={inputs} onSubmit={onSubmit} />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="w-2/3 p-5 rounded-md border"> {/* Added w-2/3 for right column width and styling */}
                        <div>
                            <Tableau titres={titres} elements={produits} titlePage={"Product List"} handleDelete={handleDelete} />
                        </div>
                    </div>
                </div>
            </div>

            
        </AppLayout>
    );
}