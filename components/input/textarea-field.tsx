import React, { InputHTMLAttributes } from 'react';

type TextAreaFieldProps = InputHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: boolean;
    errorMessage?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
};

const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
    ({ label, placeholder, setValue, error, errorMessage, required, className }: TextAreaFieldProps, ref) => {
        return (
            <div className="flex flex-col">
                {label && <label className="font-bold">{label}</label>}
                <textarea
                    onChange={setValue ? (e) => setValue(e.target.value) : undefined}
                    placeholder={placeholder}
                    ref={ref ?? undefined}
                    required={required}
                    className={className ?? 'w-full bg-transparent pt-2 border-b-2 border-violet-300'}
                />
                <span className="text-red-500 py-3 text-xs font-bold">{error && errorMessage}</span>
            </div>
        );
    }
);

export default TextAreaField;
