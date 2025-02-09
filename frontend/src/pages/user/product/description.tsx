import { Product } from "@/models/user/catalog";

type Data = {
  props: Product;
};

export default function Description(props: Data) {
  return (
    <>
      <div>
        <div className="my-3">
          <h2 className="text-xl font-bold">Description</h2>
          <p> {props.props.description}</p>
        </div>
        <div className="my-1">
          <h3 className="font-semibold">Generic Name</h3>
          <p>{props.props.generic_name}</p>
        </div>
        <div className="my-1">
          <h3 className="font-semibold">Form</h3>
          <p>{props.props.form}</p>
        </div>
        <div className="my-1">
          <h3 className="font-semibold">Unit in pack</h3>
          <p>{props.props.unit_in_pack}</p>
        </div>
        <div className="my-1">
          <h3 className="font-semibold">Classification</h3>
          <p>{props.props.classification}</p>
        </div>
        <div className="my-1">
          <h3 className="font-semibold">Manufacturer</h3>
          <p>{props.props.manufacturer}</p>
        </div>
        <div className="my-1">
          <h3 className="font-semibold">Category</h3>
          {props.props.categories.map((category) => {
            return <p key={category.id}>{category.name}</p>;
          })}
        </div>
        <div className="my-1">
          <h3 className="font-semibold">Dimension</h3>
          <p>
            {props.props.height}X{props.props.width}X{props.props.length}
          </p>
        </div>
        <div className="my-1">
          <h3 className="font-semibold">Weight</h3>
          <p>{props.props.weight}</p>
        </div>
      </div>
    </>
  );
}
