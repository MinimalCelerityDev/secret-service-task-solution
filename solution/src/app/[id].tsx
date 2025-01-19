"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SecretPage({ params }: { params: { id: string } }) {

  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchSecret = async () => {

      const res = await fetch(`http://localhost:3001/api/secret/${params.id}`);

      if (res.ok) {
        const data = await res.json();
        setSecret(data.content);
      } else {
        setError("Error while fetching the secret.");
      }
    };

    fetchSecret();
    
  }, [params.id]);

  return (
    <div className="p-10">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-green-500">{secret}</p>
      )}
    </div>
  );
}
