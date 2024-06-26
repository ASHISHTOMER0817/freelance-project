import React from "react";

// Define a TypeScript interface for the props
interface InputProps {
	type: string;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
	classList?: string;
}

// Define the Input component
const InputSpace: React.FC<InputProps> = ({
	type,
	placeholder,
	value,
	onChange,
	classList,
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};

	return (
		<input
			className={`py-4 px-7 outline-none border border-gray-400 rounded-full sm:py-2 sm:pl-6 ${classList}`}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
		/>
	);
};

export default InputSpace;
