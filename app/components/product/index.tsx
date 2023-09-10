function Product({ name, price, countryOfOrigin, volume, alcohol, image, slug, description }: any) {
  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto overflow-hidden dark:bg-gray-800">
      <p className="w-full">
        <span className="font-bold text-lg">{name} - </span>
        <span>{description}</span>
      </p>
      {countryOfOrigin && (
        <div className="mt-4 flex flex-col w-full">
          <span>
            <span className="font-bold">Χώρα προέλευσης: </span>
            {countryOfOrigin}
          </span>
          <span>
            <span className="font-bold">Αλκοόλ: </span>
            {alcohol}
          </span>
          <span>
            <span className="font-bold">Ποσότητα: </span>
            {volume}
          </span>
          <span>
            <span className="font-bold">Τιμή: </span>
            {price}
          </span>
        </div>
      )}

    </div>
  )
}

export default Product;
