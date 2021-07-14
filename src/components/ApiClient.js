export async function sendClick(url, country, ip) {
  let payload = {
    country: country,
    ip: ip,
  };
  console.log(payload);
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country: country,
      ip: ip,
    }),
  });
}
