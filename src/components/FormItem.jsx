import { Form } from "react-bootstrap"

export const FormItem = ({title,label,children}) => {
    return <div className="mb-3">
        <Form.Label htmlFor={label}>{title}</Form.Label>
        {children}
    </div>
}