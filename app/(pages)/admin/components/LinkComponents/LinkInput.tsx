export default function LinkInput({ ...props }) {
  const { handleUrlChange, onRemove, handleLabelChange } = props;

  return (
    <div
      className="p-2 mb-4 rounded-xl bg-slate-500 bg-opacity-50"
      key={props.key}
    >
      <input
        className="block mb-2 text-sm font-bold bg-transparent"
        defaultValue={props.linksData.label}
        placeholder="Label"
        onChange={(e) => handleLabelChange(e, props.id, "label")}
      ></input>
      <div className="flex">
        <input
          type="text"
          className="p-2 mr-2 w-2/3 text-black rounded border"
          placeholder="URL"
          defaultValue={props.linksData.url}
          onChange={(e) => handleUrlChange(e, props.id, "url")}
        />
        <button
          type="button"
          className="p-2 font-bold text-white bg-red-500 rounded"
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
