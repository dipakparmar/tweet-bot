import {expect, test} from '@oclif/test'

describe('setup', () => {
  test
  .stdout()
  .command(['setup'])
  .it('runs hello', (ctx: { stdout: any }) => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['setup', '--name', 'jeff'])
  .it('runs hello --name jeff', (ctx: { stdout: any }) => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
