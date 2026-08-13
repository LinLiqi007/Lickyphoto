const DEFAULT_LIKES = {"u_1":1,"c_1":1,"u_7":1,"c_7":1};
export async function onRequestOptions() {
  return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
}
export async function onRequestGet(context) {
  try {
    const raw = await context.env.DATA_KV.get('likes');
    const data = raw !== null ? raw : JSON.stringify(DEFAULT_LIKES);
    return new Response(data, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' } });
  } catch (e) {
    return new Response(JSON.stringify(DEFAULT_LIKES), { headers: { 'Content-Type': 'application/json' } });
  }
}
export async function onRequestPost(context) {
  try {
    const body = await context.request.text();
    try { JSON.parse(body); } catch {
      return new Response(JSON.stringify({ error: 'invalid json' }), { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }
    await context.env.DATA_KV.put('likes', body);
    return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  }
}