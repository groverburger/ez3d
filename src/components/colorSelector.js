export default function ColorSelect({ onInput }) {
    return (
        <input
          type="color"
          onInput={onInput}
        />
    );
  }