# LLDC automatic Instagram and Facebook property feed

The website is ready to import tagged property posts every 15 minutes. The feed supports Instagram images, carousels and Reels, plus Facebook posts and videos. Videos appear as playable cards inside the relevant property category.

## One-time Meta setup

1. In **Meta for Developers**, create or select the LLDC Business app connected to the LLDC Facebook Page and `@lldcpropertysolutions` Instagram Professional account.
2. Enable the Instagram/Facebook read permissions required for Page posts and Instagram media. Meta commonly labels these permissions `instagram_basic`, `pages_show_list`, `pages_read_engagement` and `pages_read_user_content`; the exact review screen may vary by Meta API version.
3. Generate a long-lived Page access token. Never place this token in `index.html`, JavaScript, a public file, an email, or a chat message.
4. In Meta's Graph API Explorer, request:

   `/me/accounts?fields=id,name,instagram_business_account`

   Keep the Facebook Page `id` and the connected `instagram_business_account.id`.

## Add the GitHub Actions secrets

Open the website repository and go to **Settings → Secrets and variables → Actions → New repository secret**. Add:

- `META_ACCESS_TOKEN` — the long-lived Meta Page access token
- `FACEBOOK_PAGE_ID` — the LLDC Facebook Page ID
- `INSTAGRAM_BUSINESS_ID` — the connected Instagram Professional account ID

Optional: under **Actions variables**, add `META_GRAPH_VERSION` when Meta asks you to move from the default API version.

Do not send the access token in ChatGPT. Enter it only in the protected GitHub secret field.

## Required caption tags

Every website property post must include `#LLDCWebsite` and one category tag:

- Sale: `#LLDCWebsite #ForSale`
- Rent: `#LLDCWebsite #ForRent`
- Commercial/office/industrial: `#LLDCWebsite #Commercial`
- Purchase requirement: `#LLDCWebsite #ForPurchase`

Example:

```text
2 BHK semi-furnished flat for rent in Kothrud
Rent ₹25,000 | Family preferred | Parking available

#LLDCWebsite #ForRent
```

Reels and videos use the same tags. The website creates a playable video card automatically.

## Remove a completed property

Edit the social caption and add one of these tags:

- `#Rented`
- `#Sold`
- `#Closed`
- `#LLDCRemove`

The card will disappear during the next sync. Removing `#LLDCWebsite` also removes it from the generated feed.

## Activate and test

1. Open the repository's **Actions** tab.
2. Select **Sync LLDC social property posts**.
3. Choose **Run workflow** once.
4. Confirm that `data/social-feed.json` is updated.

After the first test, the workflow checks automatically every 15 minutes. Cross-posted Instagram/Facebook copies with the same caption are deduplicated.
