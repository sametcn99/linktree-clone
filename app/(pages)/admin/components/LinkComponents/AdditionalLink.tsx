export default function AdditionalLink({ ...props }) {
  return (
    <div key={props.index} className="mb-4 text-black">
      <div className="flex">
        <input
          type="text"
          className="p-2 mr-2 w-2/3 text-black rounded border"
          placeholder="Label"
          value={JSON.stringify(props.link.label)}
          onChange={(e) =>
            props.handleAdditionalLinkChange(e, props.index, "label")
          }
        />
        <input
          type="text"
          className="p-2 w-2/3 text-black rounded border"
          placeholder="URL"
          value={props.link.value}
          onChange={(e) =>
            props.handleAdditionalLinkChange(e, props.index, "value")
          }
        />
        <button
          type="button"
          className="p-2 font-bold text-white bg-red-500 rounded"
          onClick={() => props.handleRemoveLink(props.index)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
