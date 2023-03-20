import React, { InputHTMLAttributes } from 'react';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: boolean;
    errorMessage?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
};

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    ({ type, label, placeholder, setValue, error, errorMessage, required }: TextFieldProps, ref) => {
        return (
            <div className="flex flex-col">
                {label ?? <label>{label}</label>}
                <input
                    type={type}
                    onChange={setValue ? (e) => setValue(e.target.value) : undefined}
                    placeholder={placeholder}
                    ref={ref ?? undefined}
                    required={required}
                    className="p-5"
                />
                <span className="text-red-500 py-3 text-xs font-bold">{error && errorMessage}</span>
            </div>
        );
    }
);

export default TextField;
