UPDATE public.site_content
SET content = jsonb_set(
  content,
  '{governance_docs}',
  COALESCE((
    SELECT jsonb_agg(
      CASE
        WHEN doc->>'category' = 'mechanisms' THEN jsonb_set(doc, '{category}', '"assembly_minutes"')
        WHEN doc->>'category' = 'policies' THEN jsonb_set(doc, '{category}', '"financial_statements"')
        WHEN doc->>'category' = 'policies_advanced' THEN jsonb_set(doc, '{category}', '"board_minutes"')
        ELSE doc
      END
    )
    FROM jsonb_array_elements(content->'governance_docs') AS doc
  ), '[]'::jsonb)
)
WHERE id = 'main' AND content ? 'governance_docs';