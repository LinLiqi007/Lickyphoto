const DEFAULT_COMMENTS = ﻿﻿﻿{"3":[{"id":1786526618106,"name":"匿名","text":"弟弟好圆啊","time":1786526618106}],"7":[{"id":1786526659894,"name":"匿名","text":"有点像王家卫的风格？","time":1786526659894}],"46":[{"id":1786526331033,"name":"测试者","text":"光影太美了！📷","time":1786526331033}]};
export async function onRequestOptions() {
  return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
}
export async function onRequestGet(context) {
  try {
    const raw = await context.env.DATA_KV.get('comments');
    const data = raw !== null ? raw : JSON.stringify(DEFAULT_COMMENTS);
    return new Response(data, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' } });
  } catch (e) {
    return new Response(JSON.stringify(DEFAULT_COMMENTS), { headers: { 'Content-Type': 'application/json' } });
  }
}
export async function onRequestPost(context) {
  try {
    const body = await context.request.text();
    try { JSON.parse(body); } catch {
      return new Response(JSON.stringify({ error: 'invalid json' }), { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }
    await context.env.DATA_KV.put('comments', body);
    return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  }
}