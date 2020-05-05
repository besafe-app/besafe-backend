module.exports.cron = {
  assessmentNotifications: {
    schedule: '0 0 */12 * * *',
    timezone: 'America/Sao_Paulo',
    async onTick() {
      try {
        let users = await User.find({ select: ['deviceToken', 'id'] });

        users = await Promise.all(
          users.filter(async (user) => {
            const assessment = await UserAssessment.findOne({
              where: {
                createdAt: new Date(),
                user: user.id,
              },
            });

            if (!assessment) {
              return true;
            }

            return false;
          }),
        );

        await NotificationService.send({
          title: 'Sintomas',
          body: 'Olá, você não informou seus sintomas hoje!',
          tokens: users.map((user) => user.deviceToken),
        });
      } catch (error) {
        console.error('Assessment notifications ->', error);
      }
    },
  },
};
