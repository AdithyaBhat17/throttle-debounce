import * as React from "react";
import { debounce } from "./debounce";

export default function Debounce() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [zipCodes, setZipCodes] = React.useState<Array<any> | undefined>(
    undefined
  );

  const fetchData = React.useCallback(async (url: string) => {
    const response = await window.fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.zip_codes) {
      setZipCodes(data.zip_codes);
    }
  }, []);

  const debouncedFn = React.useMemo(() => debounce(fetchData, 500), [
    fetchData,
  ]);

  React.useEffect(() => {
    const url = `http://sepomex.icalialabs.com/api/v1/zip_codes?city=${searchTerm}`;
    if (searchTerm.trim()) debouncedFn(url);
  }, [searchTerm, fetchData]);

  return (
    <div>
      <form>
        <label htmlFor="search">Search</label>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Enter a Mexican city"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <p>Zip codes: </p>
      <ul>
        {zipCodes?.length
          ? zipCodes.map((zipCode) => (
              <li key={zipCode.id}>
                {zipCode.d_ciudad || zipCode.d_asenta} - {zipCode.d_codigo}
              </li>
            ))
          : "No zip codes found"}
      </ul>
    </div>
  );
}
