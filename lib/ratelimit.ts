import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above

const ratelimit = new Ratelimit({
	redis: redis,
	limiter: Ratelimit.slidingWindow(5, "1 m"),
	analytics: true,
	prefix: "@upstash/ratelimit",
});

export default ratelimit;
