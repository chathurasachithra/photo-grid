import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Row } from 'reactstrap';
import { Button, Image, Message } from 'semantic-ui-react';

const getItems = (images) => {
    return images.map((row, i) => {
        return {
            id: `image-${row.id}`,
            url: row.picture
        };
    });
};

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: '0px',
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

class ImagesSelector extends Component {
    
    state = {
        items: getItems(this.props.rows),
        selected: [],
        error_message: ''
    };

    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );
            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    };

    postGrid = event => {

        const selectedImages = this.state.selected;
        if (selectedImages.length > 9) {
            this.setState({ error_message: 'Only nine images allow to use for your grid' });
        } else if (selectedImages.length < 9) {
            this.setState({ error_message: 'Please select nine images to generate the grid' });
        } else {
            this.setState({ error_message: '' });
            this.props.postGrid(selectedImages);
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.rows.length > 0) {
            const dataArray = nextProps.rows.map((row, i) => {
                return {
                    id: `image-${row.id}`,
                    url: row.picture
                };
            });
            this.setState({ items: dataArray });
        }
    }

    render() {
        return (
            <div>
                <Row className="submit-button-container">
                    <Button
                        className="submit-button"
                        onClick={this.postGrid}
                        inverted
                        color="green"
                        >
                        Generate Grid
                    </Button>
                </Row>
                <Row className="my-4">
                    { this.state.error_message ? (
                        <div className="d-flex justify-content-center p-3">
                            <Message error size="small">
                            { this.state.error_message }
                            </Message>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </Row>

                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                className="droppable-container droppable-container-1"
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.items.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                <Image
                                                    src={`${item.url}`}
                                                    className={`drag-image`}
                                                    wrapped
                                                    ui={false}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="droppable2">
                        {(provided, snapshot) => (
                            <div
                                className="droppable-container droppable-container-2"
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.selected.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                <Image
                                                    src={`${item.url}`}
                                                    className={`drag-image`}
                                                    wrapped
                                                    ui={false}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
}

export default ImagesSelector;
