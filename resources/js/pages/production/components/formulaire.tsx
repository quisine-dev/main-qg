import { useFormContext, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Formulaire({
  inputs,
  onSubmit,
  onCancel,
  isEditing,
  withComposants = false,
  composantsOptions = [],
}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  // 👀 Suivre le champ "type"
  const typeValue = watch("type");

  // Gestion dynamique des champs composants
  const { fields = [], append, remove } = useFieldArray({
    name: "composants",
    control,
  });

  // Réinitialiser les composants si le type devient simple
  useEffect(() => {
    if (typeValue !== "composite") {
      setValue("composants", []);
    }
  }, [typeValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 h-96 overflow-y-auto ">
      {/* Champs classiques depuis props.inputs */}
      {inputs.map(({ name, label, type = "text", placeholder, options, accept, ...rest }) => (
        <div key={name} className="flex flex-col space-y-1">
          <Label className="text-gray-500" htmlFor={name}>
            {label}
          </Label>

          {type === "textarea" ? (
            <Textarea
              id={name}
              placeholder={placeholder}
              {...register(name, { required: true })}
            />
          ) : type === "select" ? (
            <select
              id={name}
              {...register(name, { required: true })}
              className="border rounded px-3 py-2"
            >
              <option value="">-- Choisir --</option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : type === "file" ? (
            <Input id={name} type="file" accept={accept} {...register(name, { required: true })} />
          ) : (
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              {...rest}
              {...register(name, { required: true })}
            />
          )}

          {errors[name] && (
            <span className="text-sm text-red-500">Ce champ est requis</span>
          )}
        </div>
      ))}

      {/* Champs dynamiques "composants" si type === "composite" */}
      {withComposants && typeValue === "composite" && (
        <div className="space-y-4">
          <Label className="text-lg font-semibold mr-5">Composants</Label>

          {fields.map((field, index) => (
            <div key={field.id} className="border p-3 rounded space-y-2">
              <div className="flex flex-col gap-2">
                <Label>Composant #{index + 1}</Label>

                <select
                  className="border rounded px-3 py-2"
                  value={watch(`composants.${index}.mp_id`)}
                  onChange={(e) =>
                    setValue(`composants.${index}.mp_id`, e.target.value)
                  }
                >
                  <option value="">-- Sélectionner une matière première --</option>
                  {composantsOptions.map((mp) => (
                    <option key={mp.id} value={mp.id}>
                      {mp.nom}
                    </option>
                  ))}
                </select>

                <Input
                  type="number"
                  placeholder="Quantité"
                  {...register(`composants.${index}.qte`, { required: true })}
                />
              </div>

              <Button
                className="bg-red-100 text-red-700 hover:bg-red-200"
                type="button"
                onClick={() => remove(index)}
              >
                Supprimer ce composant
              </Button>
            </div>
          ))}

          <Button variant="outline" type="button" onClick={() => append({ mp_id: "", qte: "" })}>
            <Plus/> Ajouter un composant
          </Button>
        </div>
      )}

      <div className="flex gap-2 pt-4">
        <Button type="submit">{!isEditing ? "Envoyer" : "Editer"}</Button>
        {isEditing && onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler l’édition
          </Button>
        )}
      </div>
    </form>
  );
}
