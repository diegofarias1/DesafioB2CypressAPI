///<reference types="Cypress"/>

//Import de Page

describe('Testes MantisBugTracker', () => {
    afterEach(() => {
        cy.deleteProject()
    })
    beforeEach(() => {
        cy.createProject()
    })
    before(() => {
        cy.deleteProject()
    })
    })

describe('Tasks', () => {

    it('Create tasks only required fields', () => {
        taskPage.clickNewtask()
        taskPage.selectCategory()
        taskPage.sendTextResume()
        taskPage.sendTextDescribe()
        taskPage.clickSaveNewTask()

        //Validacao (Assert)
        taskPage.confirmTaskCreate()
        taskPage.navigate_home()
    })

    it('Adicionando sistema operacional nas tarfas', () => {
        taskPage.clickNewtask()
        taskPage.selectCategory()
        taskPage.sendTextResume()
        taskPage.sendTextDescribe()
        taskPage.clickSaveNewTask()
        taskPage.confirmTaskCreate()
        taskPage.viewtaskcreated()
        taskPage.clickEditTask()
        taskPage.insertOsTask()
        taskPage.clickUpdateTask()

        //Validacao (Assert)
        taskPage.checkOperationalSystemTask()

    })
    it('Criando Tarefa Com Anexo', () => {
        taskPage.clickNewtask()
        taskPage.selectCategory()
        taskPage.sendTextResume()
        taskPage.sendTextDescribe()
        taskPage.uploadFile()
        taskPage.clickSaveNewTask()
        // Validacao(Assert)
        taskPage.confirmTaskCreate()
        taskPage.confirmNameAnexo()

    })

    it.skip('Criando Tarefa com Anexo maior que o permitido', () => {
        taskPage.clickNewtask()
        taskPage.selectCategory()
        taskPage.sendTextResume()
        taskPage.sendTextDescribe()

        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get('.dropzone').attachFile('fullsize.jpg', { subjectType: 'drag-n-drop' })
            //.wait(30000)
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Os seguintes arquivos:\n"fullsize.jpg" (10.97 MiB)\n\nexcedem o tamanho máximo de arquivo permitido (2.00 MiB)')

            })
    })
    it('Duplicando Tarefa', () => {
        taskPage.clickNewtask()
        taskPage.selectCategory()
        taskPage.sendTextResume()
        taskPage.sendTextDescribe()
        taskPage.clickSaveNewTask()
        taskPage.confirmTaskCreate()
        taskPage.viewtaskcreated()
        taskPage.clickEditTask()
        taskPage.clickUpdateTaskinsert()
        taskPage.clickbuttonCloneTask()

        // Validacao(Assert)
        taskPage.assertRelatorionTask()
        taskPage.clickSaveNewTask()
        taskPage.confirmTaskCreate()

    })
    it('Validando obrigatoriedade do campo Resumo ', () => {
        taskPage.clickNewtask()
        taskPage.alertResumeTask()
    })
    it('Validando obrigatoriedade do campo Descrição ', () => {
        taskPage.clickNewtask()
        taskPage.alertResumeTask()
    })
    it('Validando obrigatoriedade do campo Categoria ', () => {
        taskPage.clickNewtask()
        taskPage.sendTextResume()
        taskPage.sendTextDescribe()
        taskPage.clickSaveNewTask()
        taskPage.alertCreateTask()
    })
    it('Informar Usuario invalido na terefa', () => {
        taskPage.clickNewtask()
        taskPage.selectCategory()
        taskPage.sendTextResume()
        taskPage.sendTextDescribe()
        taskPage.clickSaveNewTask()
        taskPage.viewtaskcreated()
        taskPage.clickNumberTaskCreated()
        taskPage.sendUsernameFalseTask()
        taskPage.clickBttAddUserFalse()
        taskPage.assertAlertUserinTask()

    })
    it('View Resume Tasks', () => {
        taskPage.clickNewtask()
        taskPage.selectCategory()
        taskPage.sendTextResume()
        taskPage.sendTextDescribe()
        taskPage.clickSaveNewTask()

        //Validacao (Assert)
        taskPage.confirmTaskCreate()
        taskPage.clickTaskResume()
        taskPage.assertResumeTask()


    })
    describe('Category', () => {


        it('Create Task Category Backend', () => {
            taskPage.clickNewtask()
            taskPage.selectCategoryBackEnd()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.clickSaveNewTask()

            //Validacao (Assert)
            taskPage.confirmTaskCreate()
            taskPage.navigate_home()
        })
        it('Create Task Category Design', () => {
            taskPage.clickNewtask()
            taskPage.selectCategoryDesign()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.clickSaveNewTask()

            //Validacao (Assert)
            taskPage.confirmTaskCreate()
            taskPage.navigate_home()
        })
        it('Create Task Category Frontend', () => {
            taskPage.clickNewtask()
            taskPage.selectCategoryFrontEnd()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.clickSaveNewTask()

            //Validacao (Assert)
            taskPage.confirmTaskCreate()
            taskPage.navigate_home()
        })
        it('Create Task Category Test', () => {
            taskPage.clickNewtask()
            taskPage.selectCategoryTest()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.clickSaveNewTask()

            //Validacao (Assert)
            taskPage.confirmTaskCreate()
            taskPage.navigate_home()
        })
    })
    it('Select Profile Create Task', () => {
        taskPage.clickNewtask()
        taskPage.selectCategory()
        taskPage.sendTextResume()
        taskPage.sendTextDescribe()
        taskPage.selectProfile()
        taskPage.clickSaveNewTask()

        //Validacao (Assert)
        taskPage.confirmTaskCreate()
        taskPage.navigate_home()

    })
    it('Criando Tarefa preenchendo Perfil ( Plataforma )', () => {
        taskPage.clickNewtask()
        taskPage.selectCategory()
        taskPage.sendTextResume()
        taskPage.sendTextDescribe()
        taskPage.insertPlataformTask()
        taskPage.clickSaveNewTask()
        // Validacao(Assert)
        taskPage.confirmTaskCreate()

    })
    it('Criando Tarefa preenchendo Perfil ( OS )', () => {
        taskPage.clickNewtask()
        taskPage.selectCategory()
        taskPage.sendTextResume()
        taskPage.sendTextDescribe()
        taskPage.insertOsTask()
        taskPage.clickSaveNewTask()

        // Validacao(Assert)
        taskPage.confirmTaskCreate()

    })
    it('Criando Tarefa preenchendo Perfil ( VERSAO OS )', () => {
        taskPage.clickNewtask()
        taskPage.selectCategory()
        taskPage.sendTextResume()
        taskPage.sendTextDescribe()
        taskPage.insertVersionOStask()

        taskPage.clickSaveNewTask()
        // Validacao(Assert)
        taskPage.confirmTaskCreate()

    })
    describe('Frequencia', () => {

        it('Criando Tarefa com frequencia "SEMPRE', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.selectFrequencySempre()
            taskPage.clickSaveNewTask()
            // Validacao(Assert)
            taskPage.confirmTaskCreate()

        })
        it('Criando Tarefa com frequencia "AS VEZES', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.selectFrequencyAsvezes()
            taskPage.clickSaveNewTask()
            // Validacao(Assert)
            taskPage.confirmTaskCreate()

        })
        it('Criando Tarefa com frequencia "Aleatorio', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.selectFrequencyAleatorio()
            taskPage.clickSaveNewTask()
            // Validacao(Assert)
            taskPage.confirmTaskCreate()

        })
        it('Criando Tarefa com frequencia "Nao Se Atentou', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.selectFrequencyNaoSeAtentou()
            taskPage.clickSaveNewTask()
            // Validacao(Assert)
            taskPage.confirmTaskCreate()

        })
        it('Criando Tarefa com frequencia "Incapaz de Produzir', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.selectFrequencyIncapaz()
            taskPage.clickSaveNewTask()
            // Validacao(Assert)
            taskPage.confirmTaskCreate()

        })
        it('Criando Tarefa com frequencia "N/D', () => {
            taskPage.clickNewtask()
            taskPage.selectCategory()
            taskPage.sendTextResume()
            taskPage.sendTextDescribe()
            taskPage.selectFrequencyND()
            taskPage.clickSaveNewTask()
            // Validacao(Assert)
            taskPage.confirmTaskCreate()
        })
    })
})




