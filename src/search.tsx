import * as React from "react";

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

  React.useEffect(() => {
    const url = `http://sepomex.icalialabs.com/api/v1/zip_codes?city=${searchTerm}`;
    const timeout = setTimeout(() => {
      if (searchTerm.trim()) fetchData(url);
    }, 500);
    return () => clearTimeout(timeout);
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
