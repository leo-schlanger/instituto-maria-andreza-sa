import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  return (
    <fieldset disabled className="grid gap-4">
      <div className="grid gap-2">
        <Label className="text-base" htmlFor="nome">
          Nome
        </Label>
        <Input className="disabled:opacity-100" id="nome" name="nome" type="text" autoComplete="name" />
      </div>
      <div className="grid gap-2">
        <Label className="text-base" htmlFor="email">
          E-mail
        </Label>
        <Input className="disabled:opacity-100" id="email" name="email" type="email" autoComplete="email" />
      </div>
      <div className="grid gap-2">
        <Label className="text-base" htmlFor="mensagem">
          Mensagem
        </Label>
        <Textarea className="disabled:opacity-100" id="mensagem" name="mensagem" autoComplete="off" />
      </div>
      <Button type="button" disabled className="w-fit disabled:opacity-100">
        Enviar
      </Button>
    </fieldset>
  );
}
