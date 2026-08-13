const DEFAULT_PASSWORD = {"value":"Linliqi050523@"};
export async function onRequestOptions() {
  return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
}
export async function onRequestGet(context) {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' };
  const kv = context.env && context.env.DATA_KV;
  if (!kv) {
    return new Response(JSON.stringify(DEFAULT_PASSWORD), { headers });
  }
  try {
    const raw = await kv.get('password');
    if (raw !== null) {
      return new Response(raw, { headers });
    }
  } catch (e) {}
  return new Response(JSON.stringify(DEFAULT_PASSWORD), { headers });
}
export async function onRequestPost(context) {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  const kv = context.env && context.env.DATA_KV;
  if (!kv) {
    return new Response(JSON.stringify({ ok: false, error: 'KV not configured' }), { status: 503, headers });
  }
  try {
    const body = await context.request.text();
    try { JSON.parse(body); } catch {
      return new Response(JSON.stringify({ ok: false, error: 'invalid json' }), { status: 400, headers });
    }
    await kv.put('password', body);
    return new Response(JSON.stringify({ ok: true }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500, headers });
  }
}