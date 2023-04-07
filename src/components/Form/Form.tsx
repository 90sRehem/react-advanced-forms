import { ErrorMessage } from "./ErrorMessage";
import { Field } from "./Field";
import { Input } from "./Input";
import { Label } from "./Label";

interface IFormProps extends React.HTMLAttributes<HTMLFormElement> { }

export function Form(props: React.PropsWithChildren<IFormProps>) {
    return (
        <form className="flex flex-col gap-4 w-full max-w-xs" {...props} />
    )
}

Form.ErrorMessage = ErrorMessage;
Form.Field = Field;
Form.Input = Input;
Form.Label = Label;