interface StructuredDataProps {
  data: object | object[];
  id?: string;
}

export function StructuredData({ data, id = "structured-data" }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas.length > 1 ? schemas : schemas[0]),
      }}
    />
  );
}
