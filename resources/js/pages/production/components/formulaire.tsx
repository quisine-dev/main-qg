import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Formulaire({ inputs, defaultValues = {}, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {inputs.map((input) => {
        const { name, label, type = "text", placeholder, options, accept } = input;

        return (
          <div key={name} className="flex flex-col space-y-1">
            <Label className="text-gray-500" htmlFor={name}>{label}</Label>

            {type === "textarea" && (
              <Textarea
                id={name}
                placeholder={placeholder}
                {...register(name, { required: true })}
              />
            )}

            {type === "select" && (
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
            )}

            {type === "file" && (
              <Input
                id={name}
                type="file"
                accept={accept}
                {...register(name, { required: true })}
              />
            )}

            {["text", "email", "number", "password"].includes(type) && (
              <Input
                id={name}
                type={type}
                placeholder={placeholder}
                {...register(name, { required: true })}
              />
            )}

            {errors[name] && (
              <span className="text-sm text-red-500">Ce champ est requis</span>
            )}
          </div>
        );
      })}

      <Button type="submit">Envoyer</Button>
    </form>
  );
}
