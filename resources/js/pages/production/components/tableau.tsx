import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash, Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

export default function Tableau({ titres, elements, titlePage, handleDelete }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openDialog = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    handleDelete(selectedId);
    setShowModal(false);
    setSelectedId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8 mt-5">
        <h2 className="text-gray-500 text-lg font-medium">{titlePage}</h2>
        <div className="flex gap-3 items-center">
          {/* Search Area with animation */}
          <div
            className={`flex items-center gap-2 transition-all duration-300 ${
              showSearch ? 'w-64' : 'w-10'
            }`}
          >
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
              onClick={() => setShowSearch((prev) => !prev)}
            >
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

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              {titres.map((titre) => (
                <TableHead key={titre}>{titre}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {elements.map((element, index) => (
              <TableRow key={index}>
                <TableCell>{element.nom}</TableCell>
                <TableCell>{element.unite}</TableCell>
                <TableCell className="text-right">
                  <Button
                    className="rounded-lg bg-red-500 w-8"
                    onClick={() => openDialog(element.id)}
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal de confirmation */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Êtes-vous sûr ?</DialogTitle>
          </DialogHeader>
          <p>Cette action est irréversible. Confirmez la suppression.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Annuler
            </Button>
            <Button onClick={confirmDelete}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
