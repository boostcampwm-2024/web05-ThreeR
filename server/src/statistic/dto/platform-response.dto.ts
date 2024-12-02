export class PlatformResponseDto {
  private constructor(
    private platform: string,
    private count: number,
  ) {}

  static platformToResults(platformStatistics: any[]) {
    return platformStatistics.map((platformStatistic) => {
      platformStatistic['count'] = parseInt(platformStatistic['count']);
      return new PlatformResponseDto(
        platformStatistic['platform'],
        platformStatistic['count'],
      );
    });
  }
}
