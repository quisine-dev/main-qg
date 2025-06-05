import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import {useState} from 'react';
import { Toaster, toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent,CardHeader,CardTitle,CardFooter } from "@/components/ui/card";
import { useForm, useFieldArray } from "react-hook-form";
import { usePage } from '@inertiajs/react';

// import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";




import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog'

import {Input} from '@/components/ui/input'; 
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,} from '@/components/ui/select';
import {Label} from '@/components/ui/label';
import { MatierePremiere } from './mp';



export interface Composition {
    id: string;
    mpc_id: number | null;
    mp_id: number | null;
    qte: number;
    created_at: string;
    updated_at: string;
    mpc?: MatierePremiere; // objet complet optionnel
    mp?: MatierePremiere;  // idem
  }

  interface InertiaProps{
    mpcs : MatierePremiere[];
    mps : MatierePremiere[];
  }


const breadcrumbs: BreadcrumbItem[] = [

    {
        title: 'Composition',
        href: '/production/composition',
    },
];


export default function Composition({mpcs, mps}:InertiaProps){
        const [showModal, setShowModal] = useState(false);
        const [editComposition, setEditComposition] = useState<Composition | null>(null);
        const [formData, setFormData] = useState({
            mpc_id: null,
            mp_id: null,
            qte: 0,
            mpc : null, // objet complet optionnel
            matierePremieres : null
        });

        const { compositions } = usePage().props;


        

        const handleAdd = () => {
            setEditComposition(null);
            setFormData({ 
                mpc_id: null,
                mp_id: null,
                qte: 0,
                mpc : null, // objet complet optionnel
                matierePremieres : null });
            setShowModal(true);
        };

        const onSubmit = (data) => {    
            if (editComposition) {
                router.put(`/production/composition/${editComposition.id}`, data, {
                    onSuccess: () => {
                        setShowModal(false);
                        toast.success('Matière Première updated successfully');
                    },
                    onError: (errors) => {
                        toast.error(errors.name || 'Failed to update Matière Première');
                    },
                });
            } else {
                router.post('/production/composition', data, {
                    onSuccess: () => {
                        setShowModal(false);
                        toast.success('Matière Première created successfully');
                    },
                    onError: (errors) => {
                        toast.error(errors.name || 'Failed to create Matière Première');
                    },
                });
            }
        };
        

        const { register, handleSubmit, control, watch,setValue } = useForm({
            defaultValues: {
              mpc_id: "",
              composants: [{ mp_id: "", qte: "" }],
            },
          });

          const { fields, append, remove } = useFieldArray({
            control,
            name: "composants",
          });


          

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Composition'/>
            <Toaster richColors closeButton position="top-right" />
            <div className="flex flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Composition</h1>
                    <Button onClick={handleAdd}>Ajouter</Button>
                </div>
            </div>
            {/* TABLES */}
            <div>
            <h1 className=" pl-5 text-xl font-bold">Liste des compositions</h1>
            <div className='grid grid-cols-6'>
                {compositions.map((composition) => (
                    <div key={composition.id} className="mb-4">
                        <div className='p-5'>
                            <Card className='w-64 h-80 pt-0'>
                                <CardHeader className='bg-black p-5'>
                                <CardTitle className='text-white text-center' >{composition.mpc.nom}</CardTitle>
                                </CardHeader>
                                <CardContent className="">
                                    <div className='h-40 overflow-y-auto'>
                                        <Table className='p-0'>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Composant</TableHead>
                                                    <TableHead>Quantité</TableHead>
                                                </TableRow>
                                            </TableHeader>

                                            <TableBody>
                                            {composition.matiere_premieres.map(mp => (
                                                <TableRow key={mp.id}>
                                                    <TableCell>{mp.nom}</TableCell>
                                                    <TableCell>{mp.pivot.qte} {mp.unite}</TableCell>
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline">Modifier</Button>
                                    <Button variant="default" className='bg-red-700' >Supprimer</Button>

                                    
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
            </div>
            



            {/* Add/Edit Category Modal */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                        <DialogTitle>
                            {editComposition ? 'Edit Composition' : 'Add Composition'}
                        </DialogTitle>
                        <DialogDescription>
                            {editComposition
                            ? 'Make changes to your Composition here.'
                            : 'Create a new Composition here.'}
                        </DialogDescription>
                        </DialogHeader>
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-2">
                            <Card>
                                <CardContent className="p-4">
                                <label className="block mb-2 font-semibold">Matière Première Composite</label>
                                <select {...register("mpc_id")} className="w-full border rounded p-2">
                                    <option value=""> Selectionner </option>
                                    {mpcs.map((item) => (
                                    <option key={item.id} value={item.id}>{item.nom}</option>
                                    ))}
                                </select>
                                </CardContent>
                            </Card>       

                            {fields.map((field, index) => (
                                <div key={field.id}>
                                <CardContent className="p-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                    <label className="font-semibold">Composant #{index + 1}</label>
                                    <Button variant="destructive" type="button" onClick={() => remove(index)}>Supprimer</Button>
                                    </div>
                                    <Select onValueChange={(value) => {
                                        setValue(`composants.${index}.mp_id`, value); // ✅ ici
                                    }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choisir une matière première" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {mps.map((mp) => (
                                        <SelectItem key={mp.id} value={mp.id.toString()}>{mp.nom}</SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                        
                                    <Input
                                    placeholder="Quantité"
                                    type="number"
                                    {...register(`composants.${index}.qte`)}
                                    />
                                </CardContent>
                                </div>
                            ))}
                        
                            <Button type="button" onClick={() => append({ mp_id: "", qte: "" })}>
                                <Plus className="w-4 h-4" />
                                Ajouter
                            </Button>

                            </div>
                            
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowModal(false)}
                                >
                                Cancel
                                </Button>
                                <Button type="submit">
                                    {editComposition ? 'Update' : 'Create'}
                                </Button>
                            </DialogFooter>
                        </form>
                </DialogContent>
            </Dialog>
            
        </AppLayout>
    );
}