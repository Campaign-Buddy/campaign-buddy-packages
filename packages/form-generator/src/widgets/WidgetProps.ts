import { FormGeneratorProps } from '../FormGeneratorProps';

export interface WidgetProps<T> {
	value: T;
	onChange: (value: T) => void;
	label: string;
	FormGenerator: React.FC<FormGeneratorProps>;
}
