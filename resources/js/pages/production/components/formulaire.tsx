import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Formulaire({ inputs, onSubmit, onCancel, isEditing }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useFormContext();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {inputs.map(({ name, label, type = "text", placeholder, options, accept }) => (
        <div key={name} className="flex flex-col space-y-1">
          <Label className="text-gray-500" htmlFor={name}>
            {label}
          </Label>

          {type === "textarea" ? (
            <Textarea id={name} placeholder={placeholder} {...register(name, { required: true })} />
          ) : type === "select" ? (
            <select id={name} {...register(name, { required: true })} className="border rounded px-3 py-2">
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
            <Input id={name} type={type} placeholder={placeholder} {...register(name, { required: true })} />
          )}

          {errors[name] && (
            <span className="text-sm text-red-500">Ce champ est requis</span>
          )}
        </div>
      ))}

      <div className="flex gap-2">
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
