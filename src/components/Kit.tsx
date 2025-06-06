import type { Kit } from '../types'

type KitProps = {
    kit : Kit
    addToCart : (item : Kit) => void
}

export default function Kit({ kit, addToCart } : KitProps) {
    const {name, image,description, price } = kit

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="img-top">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen kit" />
            </div>
            <div className="col-8 desc">
                <h3 className="text-black fs-4 fw-bold">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(kit)}
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}