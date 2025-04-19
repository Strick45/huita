document.addEventListener('DOMContentLoaded', function() {
  const bpmnModeler = new BpmnJS({
    container: '#canvas'
  });

  // Начальная диаграмма
  const initialDiagram = `
  <?xml version="1.0" encoding="UTF-8"?>
  <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
                    xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
                    xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" 
                    id="Definitions_1" 
                    targetNamespace="http://bpmn.io/schema/bpmn">
    <bpmn:process id="Process_1" isExecutable="false">
      <bpmn:startEvent id="StartEvent_1"/>
      <bpmn:task id="Task_1" name="Task"/>
      <bpmn:endEvent id="EndEvent_1"/>
      <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1"/>
      <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="EndEvent_1"/>
    </bpmn:process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
      <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
        <bpmndi:BPMNShape id="_BPMNShape_StartEvent_1" bpmnElement="StartEvent_1">
          <dc:Bounds x="173" y="102" width="36" height="36"/>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="_BPMNShape_Task_1" bpmnElement="Task_1">
          <dc:Bounds x="250" y="80" width="100" height="80"/>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="_BPMNShape_EndEvent_1" bpmnElement="EndEvent_1">
          <dc:Bounds x="400" y="102" width="36" height="36"/>
        </bpmndi:BPMNShape>
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </bpmn:definitions>
  `;

  // Загрузка начальной диаграммы
  bpmnModeler.importXML(initialDiagram)
    .then(() => console.log('Диаграмма загружена'))
    .catch(err => console.error('Ошибка загрузки:', err));

  // Сохранение диаграммы
  document.getElementById('saveButton').addEventListener('click', saveDiagram);
  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      saveDiagram();
    }
  });

  function saveDiagram() {
    bpmnModeler.saveXML({ format: true })
      .then(({ xml }) => {
        const blob = new Blob([xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'diagram.bpmn';
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(err => console.error('Ошибка сохранения:', err));
  }

  // Загрузка диаграммы
  document.getElementById('loadButton').addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.bpmn,.xml';
    
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = e => {
        bpmnModeler.importXML(e.target.result)
          .then(() => console.log('Диаграмма загружена'))
          .catch(err => console.error('Ошибка загрузки:', err));
      };
      reader.readAsText(file);
    };
    
    input.click();
  });
});