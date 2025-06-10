import AppLayout from "@/layouts/app-layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ChevronDown, Upload, Trash } from "lucide-react";
import { BreadcrumbItem } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Tableau from "./components/tableau";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: '/production/produit'
    }
];

export default function Produit() {
    const [showSearch, setShowSearch] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState("");

    // Handles the change of selected file
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFileName(event.target.files[0].name);
        } else {
            setSelectedFileName("");
        }
    };

    // Les variables
    const titres = ["Image","Name", "Unit", "Actions"];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* Main div */}
            <div className="py-6 px-5">
                <div className="flex gap-6"> {/* Added flex and gap for spacing */}
                    {/* Formulaire */}
                    <div className="w-1/3 p-5 rounded-md border"> {/* Added w-1/3 for left column width and styling */}
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Product</h2>
                        <form action="">
                            {/* Grille pour les champs du formulaire */}
                            <div className="grid grid-cols-1 gap-6"> {/* Removed md:grid-cols-2 as it's now a single column layout within the left panel */}

                                {/* Champ Nom */}
                                <div className="space-y-2">
                                    <Label htmlFor="nom" className="text-gray-500">Name</Label>
                                    <Input
                                        id="nom"
                                        name="nom"
                                        placeholder="Enter product name"
                                        required
                                    />
                                </div>

                                {/* Champ de téléversement de fichier stylisé */}
                                <div className="space-y-2">
                                    <Label htmlFor="image-upload" className="text-gray-500">Product Image</Label>
                                    <Label
                                        htmlFor="image-upload"
                                        className="flex items-center gap-3 p-2 border border-input rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <Upload className="h-5 w-5 text-gray-500" />
                                        <span className="text-sm text-gray-500">
                                            {selectedFileName || "Choose a file..."}
                                        </span>
                                    </Label>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        className="sr-only"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                {/* Champ Description sur toute la largeur */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-gray-500">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Type the product description here..."
                                        className="min-h-[120px]"
                                    />
                                </div>

                                {/* Champ Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="type" className="text-gray-500">Type</Label>
                                    <Select>
                                        <SelectTrigger id="type" className="w-full">
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MPC">Matière Composite</SelectItem>
                                            <SelectItem value="MP">Matière Première</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                            </div>

                            <div className="flex justify-end mt-6">
                                <Button type="submit">Save Product</Button>
                            </div>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="w-2/3 p-5 rounded-md border"> {/* Added w-2/3 for right column width and styling */}
                        <div className="flex justify-between items-center mb-8 mt-5">
                            <h2 className="text-gray-500 text-lg font-medium">Product List</h2>
                            <div className="flex gap-3 items-center">
                                {/* Search Area with animation */}
                                <div
                                    className={`flex items-center gap-2 transition-all duration-300 ${
                                        showSearch ? "w-64" : "w-10"
                                    }`}>

                                    {showSearch && (
                                        <Input
                                            type="text"
                                            placeholder="Search product..."
                                            className="w-full"
                                            autoFocus
                                        />
                                    )}
                                    <Button
                                        variant="outline"
                                        className="p-2"
                                        onClick={() => setShowSearch((prev) => !prev)}>
                                        <Search />
                                    </Button>
                                </div>

                                {/* Filter Button */}
                                <Button variant="outline">
                                    <SlidersHorizontal />
                                    <span className="mx-2">Filter</span>
                                    <ChevronDown />
                                </Button>
                            </div>
                        </div>

                        <Table className="">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead> {/* Changed "Nage" to "Name" based on context */}
                                    <TableHead>Unit</TableHead> {/* Added Description column */}
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                <TableRow>
                                    <TableCell>Product 1 Image</TableCell> {/* Placeholder for image */}
                                    <TableCell>Product A</TableCell>
                                    <TableCell>kg</TableCell>
                                    <TableCell className="text-right">
                                        <Button className="rounded-lg bg-red-500 w-8">
                                            <Trash/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Product 2 Image</TableCell>
                                    <TableCell>Product B</TableCell>
                                    <TableCell>g</TableCell>
                                    <TableCell className="text-right">
                                        <Button className="rounded-lg bg-red-500 w-8">
                                            <Trash/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                {/* Add more TableRows as needed for actual data */}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            {/* Table */}
            <div>
                <Tableau titres={titres} />
            </div>
        </AppLayout>
    );
}