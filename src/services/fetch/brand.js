import useFetch from "../../hooks/useFetchApi"

function useBrandNames(url) {
  const { brandNames, loadingBrands, errorBrands } = useFetch(url);

  return { brandNames, loadingBrands, errorBrands };
}

export default useBrandNames;
