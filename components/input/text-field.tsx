import React, { InputHTMLAttributes } from 'react';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: boolean;
    errorMessage?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
};

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    ({ type, label, placeholder, setValue, error, errorMessage, required }: TextFieldProps, ref) => {
        return (
            <div className="flex flex-col">
                {label && <label className="font-bold">{label}</label>}
                <input
                    type={type}
                    onChange={setValue ? (e) => setValue(e.target.value) : undefined}
                    placeholder={placeholder}
                    ref={ref ?? undefined}
                    required={required}
                    className="w-full bg-transparent pt-2 pb-1 border-b-2 border-violet-300"
                />
                <span className="text-red-500 py-3 text-xs font-bold">{error && errorMessage}</span>
            </div>
        );
    }
);

export default TextField;
