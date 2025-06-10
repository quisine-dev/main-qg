import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

export default function Tableau({titres}){
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {titres.map((titre)=> (
                        <TableHead>{titre}</TableHead>
                    ))}
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
            </TableBody>
        </Table>
    );
}