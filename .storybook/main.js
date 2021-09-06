module.exports = {
  stories: [
    "../packages/**/stories/**/*.stories.mdx",
    "../packages/**/stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/**/stories/**/*.story.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
};
