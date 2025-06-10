import {useState} from 'react';
import { router, Head } from '@inertiajs/react';
// import appLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
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
import {Toaster, toast} from "sonner";
import AppLayout from '@/layouts/app-layout';

export interface MatierePremiere {
    id : number,
    nom : string,
    type : string,
    unite: string,
    prix_unitaire : number,
    pivot?: {
        composition_id: number;
        matiere_premiere_id: number;
        qte: number;
    }
}

interface PaginatedData {
    data: MatierePremiere[];
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

interface MatierePremierePageProps {
    mps: PaginatedData;
}

const breadcrumbs: BreadcrumbItem[] = [

    {
        title: 'Matière Première',
        href: '/production/mp',
    },
];

export default function Mp({mps}:MatierePremierePageProps){
    const [showModal, setShowModal] = useState(false);

    const [editMatierePremiere, setEditMatierePremiere] = useState<MatierePremiere | null>(null);

    const [formData, setFormData] = useState({
        nom: '',
        type:'',
        unite:'',
        prix_unitaire : 0
    });

    const handleAdd = () => {
        setEditMatierePremiere(null);
        setFormData({ 
            nom: '',
            type:'',
            unite:'',
            prix_unitaire : 0 });
        setShowModal(true);
    };
    
    const handleEdit = (matierePremiere: MatierePremiere) => {
        setEditMatierePremiere(matierePremiere);
        setFormData({ 
            nom: matierePremiere.nom ,
            type: matierePremiere.type,
            unite:matierePremiere.unite,
            prix_unitaire : matierePremiere.prix_unitaire
            
        });
        setShowModal(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this Matière Première?')) {
            router.delete(`/production/mp/${id}`, {
                onSuccess: () => {
                    toast.success('Matière Première deleted successfully');
                },
                onError: (errors) => {
                    toast.error(errors.error || 'Failed to delete Matière Première');
                },
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editMatierePremiere) {
            router.put(`/production/mp/${editMatierePremiere.id}`, formData, {
                onSuccess: () => {
                    setShowModal(false);
                    toast.success('Matière Première updated successfully');
                },
                onError: (errors) => {
                    toast.error(errors.name || 'Failed to update Matière Première');
                },
            });
        } else {
            router.post('/production/mp', formData, {
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // const handlePageChange = (page: number) => {
    //     router.get(route('production.mp.index'), { page }, {
    //         preserveState: true,
    //         preserveScroll: true,
    //     });
    // };



    const unites = ["g","kg", "Litre"];



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Matière Première" />
            <Toaster richColors closeButton position="top-right" />

            {/* Main */}
            <div className="flex flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Matière Première</h1>
                    <Button onClick={handleAdd}>Ajouter Matière Première</Button>
                </div>

                {/* Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Unite</TableHead>
                            <TableHead>Prix Unitaire</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {mps.data.map((mp) => (
                            <TableRow key={mp.id}>
                            <TableCell>{mp.nom}</TableCell>
                            <TableCell>{mp.type}</TableCell>
                            <TableCell>{mp.unite}</TableCell>
                            <TableCell>{mp.prix_unitaire}</TableCell>

                            <TableCell>
                                <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(mp)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(mp.id)}
                                >
                                    Delete
                                </Button>
                                </div>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>


                    {/* Add/Edit Category Modal */}
                    <Dialog open={showModal} onOpenChange={setShowModal}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>
                                {editMatierePremiere ? 'Editer Matiere Premiere' : 'Ajouter Matiere Premiere'}
                                {/* Ajouter Matière Première */}
                            </DialogTitle>
                            <DialogDescription>
                                {/* {editCategory
                                ? 'Make changes to your category here.'
                                : 'Create a new category here.'} */}
                            </DialogDescription>
                            </DialogHeader>

                            <form  onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nom</Label>
                                    <Input
                                        id="nom"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                
                                <div className='flex gap-8'>
                                    <Select
                                        name="type"
                                        value={formData.type}
                                        onValueChange={(value) => setFormData({ ...formData, type: value })}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MPC">Matière Composite</SelectItem>
                                            <SelectItem value="MP">Matière Première</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select
                                        name="unite"
                                        value={formData.unite}
                                        onValueChange={(value) => setFormData({ ...formData, unite: value })}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Unité" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {unites.map((u) => (
                                            <SelectItem key={u} value={u}>
                                                {u}
                                            </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Input
                                id="prix_unitaire"
                                name="prix_unitaire"
                                value={formData.prix_unitaire}
                                onChange={handleInputChange}
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="Prix unitaire"
                                className="w-[180px]"
                                required
                                />


                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowModal(false)}
                                    >
                                    Cancel
                                    </Button>
                                    <Button type="submit">
                                        {editMatierePremiere ? 'Update' : 'Create'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>


        </AppLayout>
    );
}