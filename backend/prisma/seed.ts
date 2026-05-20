import { PrismaClient, UserRole, AgendamentoStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  try {
    // Limpar dados existentes (para ambiente de teste)
    // Em produção, isso não seria feito
    console.log('🧹 Limpando dados existentes...');
    await prisma.agendamento.deleteMany({});
    await prisma.user.deleteMany({});

    // ============================================
    // CRIAR USUÁRIOS DE TESTE
    // ============================================
    console.log('👤 Criando usuários de teste...');

    const anaUser = await prisma.user.create({
      data: {
        email: 'ana@example.com',
        googleId: '1234567890',
        name: 'Ana Silva',
        role: UserRole.client,
      },
    });
    console.log(`   ✓ Cliente criado: ${anaUser.name} (${anaUser.email})`);

    const joaoAdmin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        googleId: '0987654321',
        name: 'João Admin',
        role: UserRole.admin,
      },
    });
    console.log(`   ✓ Admin criado: ${joaoAdmin.name} (${joaoAdmin.email})`);

    // Usuários adicionais para teste de múltiplos clientes
    const mariaUser = await prisma.user.create({
      data: {
        email: 'maria@example.com',
        googleId: '1111111111',
        name: 'Maria Santos',
        role: UserRole.client,
      },
    });
    console.log(`   ✓ Cliente criado: ${mariaUser.name} (${mariaUser.email})`);

    const pedroUser = await prisma.user.create({
      data: {
        email: 'pedro@example.com',
        googleId: '2222222222',
        name: 'Pedro Oliveira',
        role: UserRole.client,
      },
    });
    console.log(`   ✓ Cliente criado: ${pedroUser.name} (${pedroUser.email})`);

    // ============================================
    // CRIAR AGENDAMENTOS DE TESTE
    // ============================================
    console.log('\n📅 Criando agendamentos de teste...');

    // Calcular datas relativas ao dia atual
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const in3Days = new Date(today);
    in3Days.setDate(today.getDate() + 3);

    const in5Days = new Date(today);
    in5Days.setDate(today.getDate() + 5);

    const in10Days = new Date(today);
    in10Days.setDate(today.getDate() + 10);

    // Agendamento 1: Ana - Próxima semana (solicitado)
    const booking1 = await prisma.agendamento.create({
      data: {
        userId: anaUser.id,
        date: nextWeek,
        time: '14:30',
        address: 'Rua das Flores, 123, São Paulo, SP',
        observations: 'Sofá grande, necessário limpeza profunda',
        status: AgendamentoStatus.solicitado,
      },
    });
    console.log(
      `   ✓ Agendamento criado: Ana - ${booking1.date.toLocaleDateString('pt-BR')} às ${booking1.time} (${booking1.status})`,
    );

    // Agendamento 2: Ana - Confirmado em 3 dias
    const booking2 = await prisma.agendamento.create({
      data: {
        userId: anaUser.id,
        date: in3Days,
        time: '10:00',
        address: 'Avenida Principal, 456, São Paulo, SP',
        observations: 'Sofá pequeno',
        status: AgendamentoStatus.confirmado,
      },
    });
    console.log(
      `   ✓ Agendamento criado: Ana - ${booking2.date.toLocaleDateString('pt-BR')} às ${booking2.time} (${booking2.status})`,
    );

    // Agendamento 3: Maria - Em atendimento
    const booking3 = await prisma.agendamento.create({
      data: {
        userId: mariaUser.id,
        date: today,
        time: '15:00',
        address: 'Rua do Comércio, 789, São Paulo, SP',
        observations: 'Sofá 2 lugares',
        status: AgendamentoStatus.em_atendimento,
      },
    });
    console.log(
      `   ✓ Agendamento criado: Maria - ${booking3.date.toLocaleDateString('pt-BR')} às ${booking3.time} (${booking3.status})`,
    );

    // Agendamento 4: Pedro - Concluído
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const booking4 = await prisma.agendamento.create({
      data: {
        userId: pedroUser.id,
        date: yesterday,
        time: '13:00',
        address: 'Avenida Paulista, 1000, São Paulo, SP',
        observations: 'Sofá de couro',
        status: AgendamentoStatus.concluido,
      },
    });
    console.log(
      `   ✓ Agendamento criado: Pedro - ${booking4.date.toLocaleDateString('pt-BR')} às ${booking4.time} (${booking4.status})`,
    );

    // Agendamento 5: Ana - Cancelado (slot liberado)
    const booking5 = await prisma.agendamento.create({
      data: {
        userId: anaUser.id,
        date: in5Days,
        time: '16:00',
        address: 'Rua Cancelada, 000, São Paulo, SP',
        observations: 'Cancelado para liberar slot',
        status: AgendamentoStatus.cancelado,
      },
    });
    console.log(
      `   ✓ Agendamento criado: Ana - ${booking5.date.toLocaleDateString('pt-BR')} às ${booking5.time} (${booking5.status})`,
    );

    // Agendamento 6: Maria - Múltiplos agendamentos
    const booking6 = await prisma.agendamento.create({
      data: {
        userId: mariaUser.id,
        date: in10Days,
        time: '11:00',
        address: 'Rua Sete, 777, São Paulo, SP',
        observations: 'Sofá grande com almofadas',
        status: AgendamentoStatus.solicitado,
      },
    });
    console.log(
      `   ✓ Agendamento criado: Maria - ${booking6.date.toLocaleDateString('pt-BR')} às ${booking6.time} (${booking6.status})`,
    );

    // ============================================
    // RESUMO
    // ============================================
    console.log('\n✅ Seed concluído com sucesso!');
    console.log('\n📊 Resumo dos dados criados:');
    console.log(`   - Usuários: 4 (1 admin + 3 clientes)`);
    console.log(`   - Agendamentos: 6 (vários status para teste)`);
    console.log('\n🔐 Usuários de teste:');
    console.log(`   Admin: admin@example.com (googleId: 0987654321)`);
    console.log(`   Cliente Ana: ana@example.com (googleId: 1234567890)`);
    console.log(`   Cliente Maria: maria@example.com (googleId: 1111111111)`);
    console.log(`   Cliente Pedro: pedro@example.com (googleId: 2222222222)`);
    console.log('\n💡 Dicas:');
    console.log(`   - Use "npx prisma studio" para visualizar os dados graficamente`);
    console.log(`   - Use "npx prisma db seed" para re-executar este script`);
  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
