module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-obfuscator": {
      enable: true,
      extensions: [".tsx", ".ts"],
      srcPath: "src",
      formatJson: true,
      callBack: function () {
        process.env.NODE_ENV = "production";
      },
    },
  },
};
