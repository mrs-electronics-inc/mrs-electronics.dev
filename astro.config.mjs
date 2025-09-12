// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog'

// https://astro.build/config
export default defineConfig({
	site: "https://mrs-electronics.dev",
	integrations: [
		starlight({
			plugins: [starlightBlog()],
			title: 'MRS Developers',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/mrs-electronics-inc' },
				{ icon: 'gitlab', label: 'GitLab', href: 'https://gitlab.com/mrs-electronics' },
			],
			sidebar: [
				{
					label: 'Blog',
					autogenerate: { directory: 'blog' },
				},
			],
		}),
	],
});
