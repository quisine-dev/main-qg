import AppLayout from "@/layouts/app-layout"
import { useState } from "react"
import { Toaster,toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Head, router } from "@inertiajs/react"
import { useForm, Controller,useFieldArray } from "react-hook-form";
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Card, CardContent,CardHeader,CardTitle,CardFooter } from "@/components/ui/card";


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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,} from '@/components/ui/select';
import { MatierePremiere } from "./mp"



// Les interfaces
interface OrdreProduction{
    id : number;
    mp_id : number;
    operateur : string;
    statut : string;
    qte : number,
    matiere_premiere : MatierePremiere
}

type FormData = {
    qte: number;
    mp_id: number;
    operateur : string,
    statut : string
  };
interface PaginatedData {
    data: OrdreProduction[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}
interface InertiaProps{
    mpcs : FormData[];
    ordres : OrdreProduction[];
}




export default function OrdreProduction({mpcs, ordres}:InertiaProps){
    const [showModal, setShowModal] = useState(false); 
    const [editOrdreProduction, setEditOrdreProduction] = useState<OrdreProduction | null>(null);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm<FormData>({
        defaultValues: {
          composants: [
            { mp_id: '', qte: '' }
          ]
        }
      });
      

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'composants' // nom du tableau dans les valeurs du formulaire
      });


    // Methodes
    const onSubmit = (data: FormData) => {
        if (editOrdreProduction) {
          router.put(`/production/ordre-production/${editOrdreProduction.id}`, data, {
            onSuccess: () => {
              setShowModal(false);
              toast.success("Ordre de Production mis à jour avec succès");
              setEditOrdreProduction(null);
            },
            onError: (errors) => {
              toast.error("Erreur lors de la mise à jour");
            },
          });
        } else {
          router.post("/production/ordre-production", data, {
            onSuccess: () => {
              setShowModal(false);
              toast.success("Ordre de Production créé avec succès");
            },
            onError: (errors) => {
              toast.error("Erreur lors de la création");
            },
          });
        }
        // console.log(data)
      };
      


    const handleAdd = ()=>{
        setShowModal(true);
    }

    const handleEdit = (ordre: OrdreProduction)=>{
        setEditOrdreProduction(ordre);
        reset({
            qte : ordre.qte,
            mp_id : ordre.mp_id,
            operateur: ordre.operateur,
            statut: ordre.statut,
        })
        setShowModal(true);
    }



    const status = [ {id : 1, nom : 'en_attente'},{id : 2, nom : 'en_cours'}];
    
    return (
            <AppLayout>
                <Head title="Ordre de Production" />
                <Toaster richColors closeButton position="top-right" />

                {/* Main div */}
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold">Ordre de Production</h1>
                            <Button onClick={()=>{
                                handleAdd()
                            }}>Créer un ordre de production</Button>
                    </div>

                    {/* Add/Edit Category Modal */}
                    <Dialog open={showModal} onOpenChange={setShowModal}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>
                                Ajouter Ordre de Production
                            </DialogTitle>
                            <DialogDescription>
                                Créer un nouvel ordre de Production
                            </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Card>
                                    <CardContent className="">
                                        <div className="">
                                            <div className="">
                                                <Controller
                                                    name="statut"
                                                    control={control}
                                                    rules={{ required: "Le statut est requis" }}
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Status ..." />    
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                    {status.map((statu) => (
                                                                    <SelectItem key={statu.id} value={statu.id.toString()}>{statu.nom}</SelectItem>
                                                                    ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                            </div>
                                            <div className="pt-5">
                                                <Label htmlFor="operateur">Operateur</Label>
                                                <Input
                                                    id="operateur"
                                                    placeholder="operateur en charge"
                                                    {...register("operateur", { required: "L'operateur est requis" })}
                                                />
                                                {
                                                    errors.operateur && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.operateur.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                
                                </Card>
                                {fields.map((field, index) => (
                                    <CardContent key={field.id} className="my-4 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="font-semibold">Composant #{index + 1}</label>
                                        <Button variant="destructive" type="button" onClick={() => remove(index)}>Supprimer</Button>
                                    </div>
                                        <div >
                                            <Controller
                                            name={`composants.${index}.mp_id`}
                                            control={control}
                                            rules={{ required: "Le statut est requis" }}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choisir la matière première composite" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {mpcs.map((mp) => (
                                                    <SelectItem key={mp.id} value={mp.id.toString()}>
                                                        {mp.nom}
                                                    </SelectItem>
                                                    ))}
                                                </SelectContent>
                                                </Select>
                                            )}
                                            />

                                            <div>
                                            <Label htmlFor={`composants.${index}.qte`}>Quantité</Label>
                                            <Input
                                                id={`composants.${index}.qte`}
                                                type="number"
                                                className="w-32"
                                                placeholder="Quantité"
                                                {...register(`composants.${index}.qte`, {
                                                required: "La quantité est requise",
                                                valueAsNumber: true,
                                                })}
                                            />
                                            {errors.composants?.[index]?.qte && (
                                                <p className="text-red-500 text-sm mt-1">
                                                {errors.composants[index].qte.message}
                                                </p>
                                            )}
                                            </div>
                                        </div>
                                    </CardContent>
                                ))}

                                
                                
                                            
                                    

                                <Button type="button" className="bg-green-700" onClick={() => append({ mp_id: '', qte: '' })}>
                                    Ajouter 
                                </Button>               
                                
                                
                                

                                
                                

                                <DialogFooter className="pt-8">
                                    <Button onClick={()=>{setShowModal(false)}} type="button" variant="outline">
                                        Retour
                                    </Button>
                                    <Button>Créer</Button>
                                </DialogFooter>
                            
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Tables */}
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Quantité</TableHead>
                            <TableHead>Unite</TableHead>
                            <TableHead>Operateur</TableHead>
                            <TableHead>Status</TableHead>

                            <TableHead>Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {ordres.map((ordre) => (
                            <TableRow key={ordre.id}>
                            <TableCell>{ordre.matiere_premiere.nom}</TableCell>
                            <TableCell>{ordre.qte}</TableCell>
                            <TableCell>{ordre.matiere_premiere.unite}</TableCell>
                            <TableCell>{ordre.operateur}</TableCell>
                            <TableCell>{ordre.statut}</TableCell>

                            <TableCell>
                                <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(ordre)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    
                                >
                                    Delete
                                </Button>
                                </div>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>

            </AppLayout>
        )
    
}














