import { describe, expect, it } from "vitest";
import { camelizeResponseKeys } from "./helpers";

describe("camelizeResponseKeys", () => {
	it("camelizes snake_case keys but not actual domain names used as values", () => {
		expect(
			camelizeResponseKeys({
				domain_names: ["test-domain.com", "test_domain.com"],
				meta: { dns_challenge: true },
			}),
		).toEqual({
			domainNames: ["test-domain.com", "test_domain.com"],
			meta: { dnsChallenge: true },
		});
	});

	it("does not camelize hyphenated domain names used as keys", () => {
		expect(
			camelizeResponseKeys({
				"test-domain.com": "wrong-data",
				"www.test-domain.com": "ok",
				"*.test-domain.com": "404",
			}),
		).toEqual({
			"test-domain.com": "wrong-data",
			"www.test-domain.com": "ok",
			"*.test-domain.com": "404",
		});
	});
});
