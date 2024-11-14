// commitlint.config.js
module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\S+)\s\[(\w+)\]:\s(.+)$/u,
      headerCorrespondence: ["emoji", "type", "subject"],
    },
  },
  rules: {
    "header-pattern": [2, "always"],

    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "refactor",
        "perf",
        "style",
        "docs",
        "test",
        "chore",
        "clean",
      ],
    ],
  },
  plugins: [
    {
      rules: {
        "header-pattern": ({ header }, when = "always") => {
          const regex = /^(\S+)\s(\w+):\s(.+)$/u;
          const pass = regex.test(header);
          return [
            pass,
            `커밋 메시지는 다음 형식을 따라야 합니다:\n` +
              `[이모지] [타입]: [설명]\n` +
              `예: ✨ feat: 기능 설명`,
          ];
        },
      },
    },
  ],
};
