import { useColor } from './context';

export default function ColorSelect({ onInput }) {
  const { colorChange } = useColor();
    return (
        <input
          type="color"
          value={colorChange}
          onInput={onInput}
        />
    );
  }